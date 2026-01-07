// Dữ liệu chatbot - FAQ và Keywords
// Chatbot sẽ trả lời dựa trên keywords matching

export interface CategoryData {
  category: string;
  keywords: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const CHATBOT_DATA: CategoryData[] = [
  {
    category: "banh-cuoi",
    keywords: [
      "bánh cưới", "cake cưới", "wedding cake", "bánh nhiều tầng",
      "bánh cưới 2 tầng", "3 tầng", "đặt bánh cưới", "mẫu bánh cưới",
      "giá bánh cưới", "bánh cưới sang trọng"
    ],
    faqs: [
      {
        question: "Shop có bánh cưới không?",
        answer: "Dạ có ạ! Shop chúng em chuyên làm bánh cưới nhiều tầng, từ 2-5 tầng, đẹp sang trọng ạ. Anh/chị cần tư vấn thêm không ạ?"
      },
      {
        question: "Bánh cưới có mấy tầng?",
        answer: "Shop có bánh cưới từ 2-5 tầng ạ. Tùy vào số lượng khách và không gian tiệc mà anh/chị có thể chọn số tầng phù hợp nhé!"
      },
      {
        question: "Giá bánh cưới bao nhiêu?",
        answer: "Giá bánh cưới dao động từ 2-10 triệu tùy size và tầng ạ:\n• 2 tầng: 2-3 triệu\n• 3 tầng: 3-5 triệu\n• 4-5 tầng: 5-10 triệu\nCó thể tùy chỉnh theo yêu cầu!"
      },
      {
        question: "Có làm bánh cưới theo mẫu không?",
        answer: "Dạ có ạ! Anh/chị có thể gửi hình mẫu cho em, shop sẽ tư vấn và báo giá cụ thể. Hoặc có thể tham khảo bộ sưu tập bánh cưới của shop nhé!"
      },
      {
        question: "Bánh cưới cần đặt trước bao lâu?",
        answer: "Bánh cưới nên đặt trước 1-2 tuần để shop chuẩn bị kỹ lưỡng nhất ạ. Trường hợp gấp, anh/chị liên hệ shop để được tư vấn nhé!"
      }
    ]
  },
  {
    category: "banh-sinh-nhat",
    keywords: [
      "bánh sinh nhật", "birthday cake", "bánh sinh nhật đẹp",
      "bánh sinh nhật giá rẻ", "bánh sinh nhật người lớn",
      "bánh sinh nhật trẻ em", "đặt bánh sinh nhật"
    ],
    faqs: [
      {
        question: "Bánh sinh nhật cho bao nhiêu người?",
        answer: "Shop có nhiều size bánh sinh nhật ạ:\n• Size mini (4-6 người): 200-300k\n• Size 20cm (8-10 người): 350-450k\n• Size 25cm (12-15 người): 500-650k\n• Size 30cm (20-25 người): 700k-1tr"
      },
      {
        question: "Có viết chữ lên bánh không?",
        answer: "Dạ có ạ! Shop viết chữ lên bánh miễn phí. Anh/chị cho em biết nội dung cần viết là gì nhé!"
      },
      {
        question: "Có giao trong ngày không?",
        answer: "Dạ có ạ! Nếu đặt trước 3 tiếng, shop có thể giao trong ngày. Đặt gấp liên hệ hotline để được hỗ trợ nhanh nhất nhé!"
      },
      {
        question: "Bánh sinh nhật có những vị nào?",
        answer: "Shop có các vị:\n• Kem bơ truyền thống\n• Kem tươi (ít ngọt)\n• Socola\n• Trái cây\n• Tiramisu\n• Red velvet\nVà nhiều vị khác nữa ạ!"
      }
    ]
  },
  {
    category: "banh-su-kien",
    keywords: [
      "bánh sự kiện", "bánh công ty", "bánh khai trương",
      "bánh hội nghị", "bánh event", "bánh in logo",
      "bánh đặt số lượng lớn"
    ],
    faqs: [
      {
        question: "Shop có làm bánh sự kiện không?",
        answer: "Dạ có ạ! Shop nhận làm bánh cho:\n• Sự kiện công ty\n• Khai trương\n• Hội nghị\n• Tiệc buffet\nCó thể in logo, thiết kế theo yêu cầu!"
      },
      {
        question: "Có in logo lên bánh không?",
        answer: "Dạ có ạ! Shop in logo bằng giấy ăn được hoặc vẽ tay rất đẹp. Anh/chị gửi file logo cho em nhé!"
      },
      {
        question: "Bánh sự kiện đặt số lượng lớn được không?",
        answer: "Dạ được ạ! Shop nhận đơn từ 20-100+ phần bánh. Đặt số lượng lớn sẽ có giá ưu đãi nhé!"
      }
    ]
  },
  {
    category: "banh-tre-em",
    keywords: [
      "bánh trẻ em", "bánh cho bé", "bánh hoạt hình",
      "bánh ít ngọt", "bánh cho bé 1 tuổi",
      "bánh sinh nhật cho bé"
    ],
    faqs: [
      {
        question: "Có bánh cho bé không?",
        answer: "Dạ có ạ! Shop có bánh dành riêng cho bé:\n• Ít ngọt, ít béo\n• Trang trí hoạt hình ngộ nghĩnh\n• An toàn cho bé từ 1 tuổi"
      },
      {
        question: "Có bánh hình nhân vật hoạt hình không?",
        answer: "Dạ có ạ! Shop làm được nhiều nhân vật:\n• Doraemon, Hello Kitty\n• Elsa, Anna (Frozen)\n• Pokemon, Pikachu\n• Và nhiều nhân vật khác\nBé thích nhân vật nào ạ?"
      },
      {
        question: "Bánh cho bé có ít ngọt không?",
        answer: "Dạ có ạ! Shop có dòng bánh ít ngọt dành riêng cho bé, dùng kem tươi thay kem bơ, giảm đường để phù hợp với trẻ nhỏ ạ."
      }
    ]
  },
  {
    category: "dia-chi",
    keywords: [
      "địa chỉ shop bánh", "shop bánh ở đâu",
      "cửa hàng bánh kem", "chi nhánh bánh kem",
      "giờ mở cửa"
    ],
    faqs: [
      {
        question: "Shop ở đâu?",
        answer: "Địa chỉ shop: [Điền địa chỉ của bạn]\nGiờ mở cửa: 8:00 - 21:00 (cả tuần)\n📞 Hotline: [Điền SĐT]"
      },
      {
        question: "Có chi nhánh nào khác không?",
        answer: "Hiện tại shop có [X] chi nhánh:\n• Chi nhánh 1: [địa chỉ]\n• Chi nhánh 2: [địa chỉ]\nAnh/chị ở gần chi nhánh nào ạ?"
      }
    ]
  },
  {
    category: "do-an-vat",
    keywords: [
      "đồ ăn vặt", "snack", "bánh ngọt nhỏ",
      "combo ăn vặt", "đồ ăn kèm bánh"
    ],
    faqs: [
      {
        question: "Shop có bán đồ ăn vặt không?",
        answer: "Dạ có ạ! Shop có:\n• Cookies\n• Cupcake\n• Macaron\n• Bánh bông lan trứng muối\n• Brownie\nGiá từ 10-50k/chiếc"
      },
      {
        question: "Có combo bánh + đồ ăn vặt không?",
        answer: "Dạ có ạ! Mua kèm đồ ăn vặt khi đặt bánh sẽ được giảm 10-20% nhé!"
      }
    ]
  },
  {
    category: "do-uong",
    keywords: [
      "đồ uống", "nước uống", "trà sữa",
      "trà trái cây", "combo bánh nước"
    ],
    faqs: [
      {
        question: "Có nước uống kèm bánh không?",
        answer: "Dạ có ạ! Shop có:\n• Trà sữa\n• Trà trái cây\n• Nước ép\n• Sinh tố\nGiá từ 25-45k"
      },
      {
        question: "Có combo bánh + nước không?",
        answer: "Dạ có ạ! Mua combo bánh + nước sẽ được giảm 15% nhé!"
      }
    ]
  },
  {
    category: "hot-trend",
    keywords: [
      "bánh hot trend", "bánh hot", "bánh đang hot",
      "bánh viral", "bánh trend tiktok"
    ],
    faqs: [
      {
        question: "Bánh nào đang hot nhất?",
        answer: "Hiện tại bánh hot nhất shop:\n• Bánh bơ sữa Hàn Quốc\n• Bánh tiramisu hộp\n• Bánh gấu 3D\n• Bánh kem phô mai\nĐều có sẵn, đặt là có luôn ạ!"
      },
      {
        question: "Có bánh hot trên TikTok không?",
        answer: "Dạ có ạ! Shop luôn cập nhật các mẫu bánh trend trên TikTok. Anh/chị muốn mẫu nào, gửi link em xem nhé!"
      }
    ]
  },
  {
    category: "live-custom",
    keywords: [
      "tư vấn trực tiếp", "chat với shop",
      "live chat", "tư vấn bánh", "CSKH", "nhân viên"
    ],
    faqs: [
      {
        question: "Có tư vấn trực tiếp không?",
        answer: "Dạ có ạ! Anh/chị đang chat với bộ phận CSKH rồi ạ. Em sẵn sàng tư vấn cho anh/chị!"
      },
      {
        question: "Bao lâu thì nhân viên trả lời?",
        answer: "Shop trả lời trong vòng 1-5 phút trong giờ hành chính ạ. Ngoài giờ sẽ phản hồi sớm nhất có thể!"
      }
    ]
  },
  {
    category: "phu-kien",
    keywords: [
      "phụ kiện bánh", "nến sinh nhật",
      "dao cắt bánh", "topper bánh"
    ],
    faqs: [
      {
        question: "Có bán nến sinh nhật không?",
        answer: "Dạ có ạ! Shop có:\n• Nến số: 5k/cây\n• Nến chữ Happy Birthday: 15-30k\n• Nến pháo hoa: 25k\n• Nến đặc biệt: 30-50k"
      },
      {
        question: "Mua phụ kiện kèm bánh được không?",
        answer: "Dạ được ạ! Mua kèm bánh sẽ được giảm giá phụ kiện 20% nhé!"
      }
    ]
  },
  {
    category: "tang-qua",
    keywords: [
      "tặng quà", "bánh làm quà",
      "quà sinh nhật", "bánh tặng người yêu"
    ],
    faqs: [
      {
        question: "Có gói quà không?",
        answer: "Dạ có ạ! Shop có dịch vụ gói quà đẹp với giá từ 20-50k tùy loại hộp. Có kèm thiệp chúc miễn phí!"
      },
      {
        question: "Có giao bánh làm quà không?",
        answer: "Dạ có ạ! Shop giao tận nơi, có thể ghi địa chỉ người nhận và lời nhắn nhủ. Rất tiện để tặng quà bất ngờ!"
      }
    ]
  },
  {
    category: "thiep-dien-tu",
    keywords: [
      "thiệp điện tử", "e-card",
      "lời chúc sinh nhật", "thiệp online"
    ],
    faqs: [
      {
        question: "Có thiệp điện tử không?",
        answer: "Dạ có ạ! Shop có thiệp điện tử miễn phí khi đặt bánh. Anh/chị muốn nội dung gì em thiết kế giúp nhé!"
      },
      {
        question: "Thiệp điện tử gửi như thế nào?",
        answer: "Shop sẽ gửi qua:\n• Email\n• Zalo\n• Messenger\nHoặc gửi link để anh/chị chia sẻ ạ!"
      }
    ]
  },
  {
    category: "tuy-chinh-banh",
    keywords: [
      "tùy chỉnh bánh", "custom cake",
      "bánh theo yêu cầu", "bánh thiết kế",
      "viết chữ lên bánh"
    ],
    faqs: [
      {
        question: "Có tùy chỉnh bánh không?",
        answer: "Dạ có ạ! Shop nhận tùy chỉnh:\n• Màu sắc\n• Chữ viết\n• Hình ảnh in\n• Trang trí theo chủ đề\nAnh/chị có ý tưởng gì không ạ?"
      },
      {
        question: "Có làm bánh theo ảnh mẫu không?",
        answer: "Dạ có ạ! Anh/chị gửi hình mẫu cho em, shop sẽ tư vấn độ khả thi và báo giá cụ thể nhé!"
      }
    ]
  },
  {
    category: "general",
    keywords: [
      "chào", "hello", "hi", "xin chào", "shop ơi", 
      "có ai không", "có bán không", "bán gì",
      "giá", "bao nhiêu tiền", "giá bao nhiêu",
      "size bánh", "kích thước", "mấy người ăn",
      "đặt trước", "làm trong ngày", "gấp",
      "giao hàng", "ship", "phí ship",
      "đặt bánh", "giỏ hàng", "mua hàng",
      "cảm ơn", "ok", "bye"
    ],
    faqs: [
      {
        question: "Chào",
        answer: "Xin chào! Em là chatbot hỗ trợ của shop bánh kem. Em có thể giúp gì cho anh/chị ạ?\n\n💡 Anh/chị có thể hỏi:\n• Các loại bánh (sinh nhật, cưới, trẻ em...)\n• Giá và size bánh\n• Đặt hàng và giao hàng\n• Tùy chỉnh bánh theo yêu cầu"
      },
      {
        question: "Có bán không",
        answer: "Dạ shop có bán nhiều loại bánh ạ:\n• 🎂 Bánh sinh nhật\n• 💒 Bánh cưới\n• 👶 Bánh trẻ em\n• 🎉 Bánh sự kiện\n• 🔥 Bánh hot trend\nVà còn nhiều loại khác nữa! Anh/chị quan tâm loại nào ạ?"
      },
      {
        question: "Giá",
        answer: "Giá bánh tùy loại và size ạ:\n• Bánh sinh nhật: 200k-1tr\n• Bánh cưới: 2-10tr\n• Bánh trẻ em: 250-600k\n• Snack/Ăn vặt: 10-50k\nAnh/chị muốn biết giá loại nào cụ thể ạ?"
      },
      {
        question: "Giao hàng",
        answer: "Dạ shop có giao hàng tận nơi ạ:\n• Phí ship: 15-50k tùy khoảng cách\n• Giao trong ngày nếu đặt trước 3 tiếng\n• Miễn ship cho đơn từ 500k\n• Đóng gói cẩn thận, đảm bảo bánh nguyên vẹn!"
      },
      {
        question: "Đặt bánh",
        answer: "Để đặt bánh, anh/chị:\n1. Chọn loại bánh muốn mua\n2. Cho em biết: size, vị, chữ viết (nếu có)\n3. Địa chỉ và thời gian nhận bánh\n4. Em sẽ xác nhận và báo tổng tiền\n\nHoặc có thể thêm vào giỏ hàng trên website nhé!"
      },
      {
        question: "Cảm ơn",
        answer: "Dạ không có gì ạ! Shop luôn sẵn sàng phục vụ. Chúc anh/chị một ngày tốt lành! 🎂💕"
      }
    ]
  }
];

// Greeting responses
export const GREETINGS = [
  "Xin chào! Chào mừng bạn đến với shop bánh kem 🎂",
  "Hi! Em có thể giúp gì cho anh/chị ạ?",
  "Chào anh/chị! Em là chatbot hỗ trợ của shop bánh kem 💕"
];

// Default fallback
export const FALLBACK_RESPONSE = "Em chưa hiểu rõ câu hỏi của anh/chị lắm ạ. Anh/chị có thể hỏi em về:\n• Các loại bánh (sinh nhật, cưới, trẻ em...)\n• Giá cả và kích thước\n• Đặt hàng và giao hàng\n• Tùy chỉnh bánh theo yêu cầu\n\nHoặc anh/chị có thể nói rõ hơn giúp em được không ạ?";
