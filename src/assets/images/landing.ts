import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [RouterModule],
    template: `
        
            <!-- <router-outlet/> -->
<!-- Navbar -->
<header class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <img [src]="'@assets/images/martease-logo.jpeg'" alt="Logo" class="w-10 h-10">
        <a href="#" class="text-2xl font-bold text-blue-600">Martease</a>
      </div>
      <nav>
        <ul class="flex space-x-4">
          <li><a href="#" class="text-gray-700 hover:text-blue-600">Home</a></li>
          <li><a href="#" class="text-gray-700 hover:text-blue-600">Shop</a></li>
          <li><a href="#" class="text-gray-700 hover:text-blue-600">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div class="text-center">
      <img src="https://via.placeholder.com/400x300" alt="Coming Soon Illustration" class="mx-auto mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Coming Soon!</h1>
      <p class="text-lg text-gray-600 mb-8">Our eCommerce website is under construction. Stay tuned for updates!</p>
      <button pButton class="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500">
        Notify Me
      </button>
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-white shadow-md mt-8">
    <div class="container mx-auto px-4 py-6 text-center">
      <p class="text-gray-600">&copy; 2025 MyStore. All rights reserved.</p>
      <div class="mt-4">
        <a href="#" class="text-blue-600 mx-2">Privacy Policy</a>
        <a href="#" class="text-blue-600 mx-2">Terms of Service</a>
      </div>
      <div class="mt-6 flex justify-center space-x-4">
        <a href="#" class="text-gray-700 hover:text-blue-600"><i class="pi pi-facebook"></i> Facebook</a>
        <a href="#" class="text-gray-700 hover:text-blue-600"><i class="pi pi-twitter"></i> Twitter</a>
        <a href="#" class="text-gray-700 hover:text-blue-600"><i class="pi pi-instagram"></i> Instagram</a>
        <a href="#" class="text-gray-700 hover:text-blue-600"><i class="pi pi-linkedin"></i> LinkedIn</a>
      </div>
      <div class="mt-6">
        <p class="text-gray-600">Have questions? Email us at <a href="mailto:support@mystore.com" class="text-blue-600">{{'support@mystore.com'}}</a></p>
      </div>
    </div>
  </footer>
       
    `
})
export class Landing implements OnInit {
    constructor(private authService: AuthService, private router: Router){}
    ngOnInit(){
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/pages']); // Redirect to home if already logged in
          }
        
    }
}
