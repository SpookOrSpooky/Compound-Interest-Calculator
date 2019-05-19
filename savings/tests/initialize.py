from ..models import Savings, Month


def initialize():
    savings = Savings(
        payment_frequency= '12',
        initial_deposit= "1000.0",
        monthly_deposit="100.00",
        interest_rate="0.04"
    )
    savings.save()

    first_month = Month(
        interest='0',
        total_interest='0',
        total_value='1000',
        belongs_to=savings
    )
    first_month.save()

