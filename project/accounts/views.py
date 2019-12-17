from django.contrib import auth
from django.contrib.auth import authenticate
from django.shortcuts import render, redirect

from accounts.decorators import login_forbidden
from accounts.forms import SignUpForm, LoginForm
from accounts.models import User


@login_forbidden
def signup(request):
    if request.method == 'POST':
        signup_data = {
            "email": request.POST.get('email'),
            "password": request.POST.get('password'),
            "first_name": request.POST.get('first_name'),
            "last_name": request.POST.get('last_name'),
        }
        user = User.objects.create_user(**signup_data)
        user = authenticate(email=user.email, password=signup_data['password'])
        auth.login(request, user)
        print(2)
        return redirect('core:main')
    print(1)
    return render(request, 'core/main.html')


@login_forbidden
def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            auth.login(request, user)
            return redirect('core:main')
    return render(request, 'core/main.html')


def logout(request):
    auth.logout(request)
    return redirect('core:main')
