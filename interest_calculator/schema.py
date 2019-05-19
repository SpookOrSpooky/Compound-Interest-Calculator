import graphene
from graphene_django import DjangoObjectType

import savings.schema


class Query(
    savings.schema.Query,
    graphene.ObjectType,
):
    pass


class Mutation(
    savings.schema.Mutation,
    graphene.ObjectType,
):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)


