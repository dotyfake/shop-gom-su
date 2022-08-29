## Thông tin dự án

Dự án là một webapp thương mại điện tử thủ công mỹ nghệ, giúp người dùng mua hàng trực tuyến và quản lý đơn hàng.

### Các chức năng chính của dự án:

-   Tra cứu sản phẩm trên trang chủ.
-   Tra cứu sản phẩm qua chức năng tìm kiếm.
-   Lọc sản phẩm theo loại.
-   Đăng nhập.
-   Quản lý đơn hàng.
-   Mua hàng trực tiếp trên website.
-   ...

---
## Link demo: https://gomsu.tk/
## Công nghệ sử dụng trong dự án

### Frontend

-   Dự án được tạo từ CRA(create-react-app).
-   CSS sử dụng SCSS module, thư viện classnames và normalize.css.
-   Định tuyến của trang sử dụng react-router-dom.
-   Lazyloading với react-lazy-load-image-component.
-   SEO với thư viện react-helmet.
-   Slide sử dụng thư viện swiper.
-   Toast sử dụng thư viện react-toastify
-   Icon sử dụng fortawesome.
-   Popper và tooltip sử dụng tippyjs.
-   Validate form với thư viện react-hook-form và yup.
-   Authentication với firebase.
### State management

-   State management sử dụng contextAPI.

### Backend

-   Serverless nodejs runtime Netlify.
-   API của trang được viết từ **function** của Netlify dựa trên Notion API.
-   Database: Sử dụng Notion Database.

### CMS

-   CMS: notion.

---

## Cấu trúc thư mục trong dự án

```
shop-gom-su
│   README.md
│   netlify.toml (build settings, deploy settings, and environment variables)
│   ...
└───functions (Để viết code Node.js, trong dự án này chỉ dùng để viết API)
└───src
    └───assets (Chứa tài nguyên của trang web)
    └───Commponents
    └───layout
    └───pages
    └───store (State management)
    ...
```
