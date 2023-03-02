import Blog from "../component/Blog";
import NewProducts from "../component/NewProducts";
import '../style/main.css';
const Home = () => {
  return (
    <>
      <div
        className="main_slider"
        style={{ backgroundImage: "url(/assets/banner.png)" }}
      >
        <div className="container fill_height">
          <div className="row align-items-center fill_height">
            <div className="col">
              <div className="main_slider_content">
                <h1>Giảm giá lên đến 30% cho đơn đầu tiên.</h1>
                <div className="red_button shop_now_button">
                  <a href="sanpham.html">Mua Ngay</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewProducts />
      <Blog />
    </>
  );
};

export default Home;
