
import { MenuItem } from './types';

export const SHOP_NAME = "พี่ขวัญนมสด";
export const SHOP_SUBTITLE = "PEE KWAN NOM SOD";
export const PROMPT_PAY_ID = "081-234-5678";
export const CONTACT_PHONE = "081-234-5678";
export const ADMIN_PASSCODE = "101010";

// รูปภาพหลักที่จะใช้กับเมนูที่ยังไม่ได้กำหนดรูปเฉพาะ
const UNIVERSAL_IMAGE = 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800';

export const MENU_ITEMS: MenuItem[] = [
  // เครื่องดื่มร้อน (Hot Drinks)
  {
    id: 'h1',
    name: 'น้ำเต้าหู้ร้อน',
    description: 'สูตรต้นตำรับ หอมกรุ่นจากถั่วเหลืองแท้',
    price: 20,
    category: 'เครื่องดื่มร้อน',
    image: 'https://i.pinimg.com/1200x/92/d7/6e/92d76ecfa93348c4509754773b6643e9.jpg'
  },
  {
    id: 'h2',
    name: 'น้ำเต้าหู้ร้อนงาดำ',
    description: 'หอมงาดำคั่วบดละเอียด ดีต่อสุขภาพ',
    price: 25,
    category: 'เครื่องดื่มร้อน',
    image: 'https://www.matichonacademy.com/wp-content/uploads/2021/09/soy-milk-mix-black-sesame-marble-background-2.jpg'
  },
  {
    id: 'h3',
    name: 'น้ำเต้าหู้ร้อนใส่น้ำขิง',
    description: 'เต้าฮวยน้ำขิงรสเข้มข้น ไล่ลม บำรุงร่างกาย',
    price: 25,
    category: 'เครื่องดื่มร้อน',
    image: 'https://www.pholfoodmafia.com/wp-content/uploads/2023/10/7Tofu-Pudding-in-Ginger-Syrup.jpg'
  },
  {
    id: 'h4',
    name: 'น้ำเต้าหู้ใส่ลูกเดือย',
    description: 'น้ำเต้าหู้ทรงเครื่อง พร้อมลูกเดือยเคี้ยวหนึบ',
    price: 25,
    category: 'เครื่องดื่มร้อน',
    image: 'https://img.kapook.com/u/2017/surauch/cooking/u1_20.jpg'
  },
  {
    id: 'h5',
    name: 'น้ำเต้าหู้ร้อนรสกาแฟ',
    description: 'ผสมผสานความหอมของกาแฟและนมถั่วเหลือง',
    price: 30,
    category: 'เครื่องดื่มร้อน',
    image: 'https://res.cloudinary.com/dk0z4ums3/image/upload/v1502029249/attached_image_th/%E0%B8%8A%E0%B9%87%E0%B8%AD%E0%B8%81%E0%B9%82%E0%B8%81%E0%B9%81%E0%B8%A5%E0%B8%95-%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%94%E0%B8%B7%E0%B9%88%E0%B8%A1%E0%B9%81%E0%B8%A5-pobpad.jpg'
  },
  {
    id: 'h6',
    name: 'น้ำเต้าหู้ร้อนมัจฉะ',
    description: 'เข้มข้นมัทฉะแท้ กลิ่นอายญี่ปุ่น',
    price: 35,
    category: 'เครื่องดื่มร้อน',
    image: 'https://th-test-11.slatic.net/p/1886a0a4a1a463954a9c16fbdda7931d.jpg'
  },
  {
    id: 'h7',
    name: 'น้ำเต้าหู้ร้อนโกโก้',
    description: 'รสโกโก้เข้มข้น หวานมันกำลังดี',
    price: 30,
    category: 'เครื่องดื่มร้อน',
    image: 'https://img.wongnai.com/p/400x0/2020/07/15/7e8905b5ede14dd09e9a086123011d7e.jpg'
  },

  // เครื่องดื่มเย็น (Cold Drinks)
  {
    id: 'c1',
    name: 'น้ำเต้าหู้เย็น',
    description: 'เย็นสดชื่น หวานพอดี',
    price: 25,
    category: 'เครื่องดื่มเย็น',
    image: 'https://img.wongnai.com/p/256x256/2022/06/04/1883cee233674a93abbfd9bea90f48c9.jpg'
  },
  {
    id: 'c2',
    name: 'น้ำเต้าหู้เย็นงาดำ',
    description: 'เข้มข้นงาดำ เย็นฉ่ำ',
    price: 30,
    category: 'เครื่องดื่มเย็น',
    image: 'https://img.wongnai.com/p/400x0/2020/10/14/40e4bc462a7a43e69752a5edc2e2ef7a.jpg?v=4'
  },
  {
    id: 'c3',
    name: 'น้ำเต้าหู้เย็นใส่เฉาก๊วย',
    description: 'หนึบหนับ ดับร้อน',
    price: 30,
    category: 'เครื่องดื่มเย็น',
    image: 'https://lh3.googleusercontent.com/proxy/rzUncE9Wx7Nvl7pSo_iqUjvFS_96wC0svSLtIa4xxgaWEBzS2X6DdP6QBS8LFzGNRnwIQP0WkjfU6cRgTzHIIiuSEQ2O3DeGbZhp6GHePGzddNOwN3WxO3BWI7d_lz6_pvap6IdI-bA59XhELI4'
  },
  {
    id: 'c4',
    name: 'น้ำเต้าหู้เย็นใส่เม็ดแมงลัก + วุ้นมะพร้าว',
    description: 'เคี้ยวสนุก อยู่ท้อง',
    price: 30,
    category: 'เครื่องดื่มเย็น',
    image: 'https://www.pholfoodmafia.com/wp-content/uploads/2016/01/1000x6503SoybeanMilk.jpg'
  },
  {
    id: 'c5',
    name: 'น้ำเต้าหู้เย็นรสชาเขียว',
    description: 'มัทฉะพรีเมียม สูตรเย็น',
    price: 35,
    category: 'เครื่องดื่มเย็น',
    image: 'https://img.wongnai.com/p/1920x0/2018/11/20/744f11b55ba84a6c943e2adacbf744e5.jpg'
  },
  {
    id: 'c6',
    name: 'น้ำเต้าหู้เย็นรสโกโก้',
    description: 'โกโก้เข้มข้น ดับกระหาย',
    price: 35,
    category: 'เครื่องดื่มเย็น',
    image: 'https://img.wongnai.com/p/1920x0/2021/04/20/bc752386cc744211b90a53abad402f8b.jpg'
  },
  {
    id: 'c7',
    name: 'น้ำเต้าหู้เย็นรสคาราเมล',
    description: 'หอมหวานคาราเมล',
    price: 40,
    category: 'เครื่องดื่มเย็น',
    image: 'https://www.gourmetandcuisine.com/Images/editor_upload/_editor20190924021556_original.jpg'
  },

  // ของทานเล่น (Snacks)
  {
    id: 's1',
    name: 'ปาท่องโก๋',
    description: 'กรอบนอก นุ่มใน ทอดใหม่ร้อนๆ',
    price: 2,
    category: 'ของทานเล่น',
    image: 'https://www.bloggang.com/data/j/jazzy-bong/picture/1615460541.jpg'
  },
  {
    id: 's2',
    name: 'น้ำเต้าหู้จิ้มนมข้น',
    description: 'ชุดอร่อยยอดฮิต ทานคู่กันลงตัวที่สุด',
    price: 15,
    category: 'ของทานเล่น',
    image: 'https://fit-d.com/image_webp/f?src=./uploads/food/751fbfd2abc44e2c17027207fbbc51e7.jpg'
  },
  {
    id: 's3',
    name: 'น้ำเต้าหู้จิ้มสังขยา',
    description: 'หอมใบเตยแท้ หวานมันกำลังดี',
    price: 25,
    category: 'ของทานเล่น',
    image: 'https://ptkss.com/wp-content/uploads/2025/09/%E0%B8%9B%E0%B8%B2%E0%B8%97%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%82%E0%B8%81%E0%B9%8B.png'
  },
  {
    id: 's4',
    name: 'ขนมปังจิ้มสังขยา',
    description: 'ขนมปังนึ่งนุ่มๆ กับสังขยาเข้มข้น',
    price: 40,
    category: 'ของทานเล่น',
    image: 'https://img.kapook.com/u/2016/wanwanat/9988_Custard/custard1.jpg'
  },
  {
    id: 's5',
    name: 'ขนมปังจิ้มชาไทย',
    description: 'ซอสชาไทยหอมเข้มข้น สไตล์ไทยแท้',
    price: 40,
    category: 'ของทานเล่น',
    image: 'https://www.gourmetandcuisine.com/Images/editor_upload/_editor20220321031224_original.jpg'
  },
  {
    id: 's6',
    name: 'เต้าฮวยนมสด',
    description: 'เต้าฮวยเนื้อนุ่ม ในน้ำนมสดหอมๆ',
    price: 15,
    category: 'ของทานเล่น',
    image: 'https://www.thailandinnovationportal.com/file/get/file/202109226bad2b47dbd2f2ec59dca172b2977293011316.jpg'
  }
];
