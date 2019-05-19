import pytest
from interest_calculator.schema import schema
from graphene.test import Client
from .initialize import initialize

pytestmark = pytest.mark.django_db

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
