# -*- coding: utf-8 -*-
# snapshottest: v1 - https://goo.gl/zC4yUc
from __future__ import unicode_literals

from snapshottest import Snapshot


snapshots = Snapshot()

snapshots['test_query_months_to_savings 1'] = {
    'data': {
        'months': [
            {
                'belongsTo': {
                    'id': '1',
                    'initialDeposit': 1000.0,
                    'interestRate': 0.04,
                    'monthlyDeposit': 100.0,
                    'paymentFrequency': 12
                },
                'id': '1',
                'interest': 0.0,
                'totalInterest': 0.0,
                'totalValue': 1000.0
            }
        ]
    }
}
