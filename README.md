# Restaurant RESTful API and Frontend

## Author : Tossapon nilpech

Description โปรเจ็กต์นี้ใช้ RESTful API เพื่อจัดการข้อมูลร้านอาหารโดยใช้ Node.js, Express.js, Sequelize และ CORS โต้ตอบกับ API เพื่อดำเนินการ CRUD กับรายการร้านอาหาร

## ก่อนที่จะเริ่มต้องเตรียม

- Node.js and npm (Node Package Manager)
- MySQL server
- Modern web browser

### ขั้นตอนการติดตั้ง

1. โคลน backend repository ลงมาที่เคลื่อน git clone:

```bash
git clone https://github.com/TASAHOST/restful_v2.git 
```

2. เปลี่ยน Branch ไปเป็น 02-sequelize-version
```bash
git checkout 02-sequelize-version
```


## การเรียกใช้งานเซิร์ฟเวอร์

```bash
cd restful_v2
npm i
npm run dev
```

## การเรียกใช้งานFrontend

1. โคลน frontend repository ลงมาที่เคลื่อน git clone:

```bash
git clone https://github.com/TASAHOST/frontend_restaurant.git
```

# RESTful API

**GET** `/restaurants`:คือการดึงรายการร้านอาหารทั้งหมด 
**GET** `/restaurants/:id`:จะเป็นการ ดึงรายละเอียดของรายการร้านอาหารที่ระบุด้วย ID 
**POST** `/restaurants`:คือการ สร้างรายการร้านอาหารใหม่ 
**PUT** `/restaurants:id`:เป็นการอัพเดตรายละเอียดของรายการร้านอาหารที่ระบุด้วย ID 
**DELETE** `/restaurants/:id`: คือการ ลบรายการร้านอาหารที่ระบุด้วย ID




