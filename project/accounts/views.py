from django.contrib import auth
from django.contrib.auth import authenticate
from django.shortcuts import render, redirect

from accounts.decorators import login_forbidden
from accounts.forms import SignUpForm, LoginForm


@login_forbidden
def signup(request):
    form = SignUpForm(request.POST or None)
    if request.method == 'POST':
        if form.is_valid():
            user = form.save(commit=False)
            user.username = form.cleaned_data.get('email')
            user.save()
            user = authenticate(username=user.username, password=form.cleaned_data.get('password1'))
            auth.login(request, user)
            return redirect('core:main')
    return render(request, 'accounts/signup.html', {
        'form': form,
    })


@login_forbidden
def login(request):
    form = LoginForm(request.POST or None)
    if request.method == 'POST':
        if form.is_valid():
            email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=email, password=password)
            if user is not None:
                auth.login(request, user)
                return redirect('core:main')
    return render(request, 'accounts/login.html', {
        'form': form,
    })


def logout(request):
    auth.logout(request)
    return redirect('core:main')
