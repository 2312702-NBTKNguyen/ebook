from django.http import HttpResponse
from django.shortcuts import render

def books(request):
    return HttpResponse("Hello world!")
