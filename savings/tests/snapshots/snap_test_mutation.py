# -*- coding: utf-8 -*-
# snapshottest: v1 - https://goo.gl/zC4yUc
from __future__ import unicode_literals

from snapshottest import Snapshot


snapshots = Snapshot()

snapshots['test_mutation_create_savings 1'] = {
    'errors': [
        {
            'locations': [
                {
                    'column': 36,
                    'line': 2
                }
            ],
            'message': '''Syntax Error GraphQL (2:36) Expected $, found Name "paymentFrequency"

1: 
2:             mutation createSavings(paymentFrequency: 12, initialDeposit: 1000, monthlyDeposit: 100, interestRate: 0.04){
                                      ^
3:             savings {
'''
        }
    ]
}
