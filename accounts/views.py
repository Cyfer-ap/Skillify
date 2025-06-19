from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from .forms import RegisterForm, LoginForm
from django.contrib.auth.decorators import login_required

def home_view(request):
    return render(request, 'accounts/home.html')

def register_view(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('dashboard_redirect')
    else:
        form = RegisterForm()
    return render(request, 'accounts/register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('dashboard_redirect')
    else:
        form = LoginForm()
    return render(request, 'accounts/login.html', {'form': form})

@login_required
def dashboard_redirect(request):
    if request.user.role == 'student':
        return redirect('student_dashboard')
    elif request.user.role == 'teacher':
        return redirect('teacher_dashboard')
    else:
        return redirect('home')

@login_required
def student_dashboard(request):
    return render(request, 'accounts/student_dashboard.html')

@login_required
def teacher_dashboard(request):
    return render(request, 'accounts/teacher_dashboard.html')

def logout_view(request):
    logout(request)
    return redirect('home')
