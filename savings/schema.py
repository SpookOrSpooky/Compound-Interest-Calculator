import graphene
from graphene_django import DjangoObjectType
from django.db.models import Q
from graphql import GraphQLError

from .models import Savings, Month

from decimal import *


class SavingsType(DjangoObjectType):
    class Meta:
        model = Savings


class MonthType(DjangoObjectType):
    class Meta:
        model = Month


# Queries

class Query(graphene.ObjectType):
    savings = graphene.List(SavingsType)
    months = graphene.List(MonthType)

    def resolve_savings(self, info):
        # returns the first (should be the only one) object
        return Savings.objects.all()
        # if too slow, could do
        # return Savings.objects.all().first()

    def resolve_months(self, info):
        # objects should only exist for the one Savings object in existence
        return Month.objects.all()


# Mutations

# months = graphene.Field(MonthType)
class CreateSavings(graphene.Mutation):
    savings = graphene.Field(SavingsType)

    # For error reporting
    form_errors = graphene.String()

    class Arguments:
        payment_frequency = graphene.Int()
        initial_deposit = graphene.Float()
        monthly_deposit = graphene.Float()
        interest_rate = graphene.Float()



    def mutate(self, info,  payment_frequency, initial_deposit, monthly_deposit, interest_rate):



        #if not payment_frequency or not initial_deposit or not monthly_deposit,

        # type restriction checks
        if (payment_frequency != 1 & payment_frequency != 3 & payment_frequency != 12):
            return CreateSavings(form_errors="Frequency input was of an invalid integer")

        x = 1000000000000.00
        if ((initial_deposit > x) | (monthly_deposit > x) | (interest_rate >= 10.0)):
            return CreateSavings(form_errors="Argument values exceed digit limits")

        # Converting to decimal from the graphene float values. This will allow us to make more human accurate calculations
        # and meet the DecimalFields expectation for a Decimal type object
        i_d = Decimal(initial_deposit).quantize(Decimal('.01'), rounding=ROUND_HALF_UP)
        m_d = Decimal(monthly_deposit).quantize(Decimal('.01'), rounding=ROUND_HALF_UP)
        i = Decimal(interest_rate).quantize(Decimal('.0001'), rounding=ROUND_HALF_UP)

        # Will delete any existing Savings object and create a new one for the new values presented.
        # print("About to check for delete")
        if (Savings.objects.exists):
            Savings.objects.all().delete()

        # Creating a new Savings object
        savings = Savings(payment_frequency=payment_frequency, initial_deposit=i_d, monthly_deposit=m_d,
                          interest_rate=i, id=1)
        savings.save()

        # creating the month objects

        # creating the month 0 object, ie. the first object which holds the initial deposit

        # initial_month = Month(interest=Decimal(0), total_interest=Decimal(0), total_value=1000, belongs_to=savings, id=1)
        # initial_month.save()

        # month creation variables
        # previous total value and total interest from month prior
        prevTV = 1000.0
        prevTI = 0.0
        num_months = 50 * 12

        # the following is the interval by which interest will be compounded on
        # Not to confuse it with payment_frequency, which is # of times /year interest is compounded
        payment_rate = 0
        if (payment_frequency == 12):
            payment_rate = 1
        elif (payment_frequency == 1):
            payment_rate = 12
        else:
            payment_rate = 3

        # The following is the interest rate by which each compound period will be multiplied by
        rate = float(i) / float(payment_frequency)

        # creating the months from 1 to 600, based on num_months= 600

        # batch = list(graphene.ObjectType)
        batch = []
        # getcontext().prec = 2
        for n in range(1, num_months + 1):
            #  print(n)
            interest = 0
            if ((n % payment_rate) == 0):
                interest = round(prevTV * rate, 2)

            # Setting the value of our total interest to be prevIT + interest.
            # Also sets our PrevTI to the correct value for the next iteration
            prevTI = prevTI + interest

            # We do a similar operation  here for our total value for this period as we did for prevTI
            prevTV = prevTV + interest + monthly_deposit
            #   print(prevTV)
            # NOTE: the PrevTI and TV values are current to this months values,
            # just set them up for the next month prior to creating new instance of month
            month = Month(interest=interest, total_interest=prevTI, total_value=prevTV, belongs_to=savings, id=n)
            batch.append(month)

        #  print("calculations done, batch appending")
        Month.objects.bulk_create(batch)

        #  print("batch append complete")

        return CreateSavings(savings=savings, form_errors="No Errors")


'''
class RemoveAll(graphene.Mutation):
    value = graphene.Boolean

    def mutate(self, info):
        Savings.objects.all().delete()
        Month.objects.all().delete()

        return RemoveAll(value = True)
'''


class Mutation(graphene.ObjectType):
    create_savings = CreateSavings.Field()
    # remove_all = RemoveAll.Field()

# Schema Complete




