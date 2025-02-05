<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        // สร้างข้อมูลจำลองด้วย Seeder อื่น ๆ ที่เราสร้างไว้ 
        $this->call(SalesSystemSeeder::class);
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'unique_test@example.com', // เปลี่ยนอีเมลให้ไม่ซ้ำกัน
        ]);
    }
}
