from django.urls import path
from .views import calculate
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

urlpatterns = [
    #path('calculate/', calculate, name="calculate"),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
]
