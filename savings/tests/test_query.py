import pytest
from interest_calculator.schema import schema
from graphene.test import Client
from .initialize import initialize

pytestmark = pytest.mark.django_db

#In standard TDD fashion, we're starting with a test for type and moving on to a test for the query
def test_savings_type():
    instance = schema.SavingsType()
    assert instance

def test_month_type():
    instance = schema.MonthType()
    assert instance

#this allows us to validate both our savings and month queryies while also ensuring that the ForeignKey relation sticks
def test_query_months_to_savings(snapshot):
    initialize()
    client = Client(schema)
    snapshot.assert_match(
        client.execute(
            '''
            query {
                months {
                    id    
                    interest
                    totalInterest
                    totalValue
                    belongsTo{
                        id
                        paymentFrequency
                        initialDeposit
                        monthlyDeposit
                        interestRate   
                    }
                }
            }    
            '''
            ))
