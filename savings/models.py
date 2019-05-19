from django.db import models
from django.conf import settings



#The decimal fields in this have been limited to 15 digits for a 1 trillion cap
'''
   
    '''
#choices=[(1, 'Yearly'), (3, 'Quarterly'), (12, 'Monthly')],
class Savings(models.Model):





    # selection for how often per year interest is compounded.
    payment_frequency = models.IntegerField(blank=False)




    #initial deposit
    initial_deposit = models.DecimalField(max_digits=15, decimal_places=2, blank=False)

    #monthly deposit amount
    monthly_deposit = models.DecimalField(max_digits=15, decimal_places=2, blank=False)

    #interest percent rate
    interest_rate = models.DecimalField(max_digits=5, decimal_places=4, blank=False)


    #deprecated
    '''
    # selection for how often interest is compounded
    MONTHLY = 'M'
    QUARTERLY = 'Q'
    YEARLY = 'Y'

    FREQUENCY_CHOICES = (
        (MONTHLY, 'MONTHLY'),
        (QUARTERLY, 'QUARTERLY'),
        (YEARLY, 'YEARLY'),
    )

    payment_frequency = models.CharField(max_length=1, choices=FREQUENCY_CHOICES, blank=False)
    '''


class Month(models.Model):
    #the interest gained in this specific period
    interest = models.DecimalField(max_digits=15, decimal_places=2, blank=False)
    #the total interest, including the interest calculated from this period
    total_interest = models.DecimalField(max_digits=15, decimal_places=2, blank=False)
    #the total value up to and including this period, including the monthly deposit and interest for this period
    total_value = models.DecimalField(max_digits=20, decimal_places=2, blank=False)


    belongs_to = models.ForeignKey(
        'savings.Savings',
        related_name="months",
        on_delete=models.CASCADE,
        )





