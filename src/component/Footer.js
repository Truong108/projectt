import { Link } from "react-router-dom"

function Footer(){
    return (
        <>
<footer className="footer-section mt-5">
  <div className="container">
    <div className="footer-cta pt-5 pb-3">
      <div className="row">
        <div className="col-xl-4 col-md-4 mb-30">
          <div className="single-cta">
          <i class="bi bi-house-door-fill"/>
            <div className="cta-text">
              <h4>Địa chỉ</h4>
              <span>24 Bầu Trâm </span>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-4 mb-30">
          <div className="single-cta">
          <i class="bi bi-headset"/>
            <div className="cta-text">
              <h4>Số điện thoại:</h4>
              <span>0387653312</span>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-4 mb-30">
          <div className="single-cta">
          <i class="bi bi-envelope"/>
            <div className="cta-text">
              <h4>Mail chúng tôi</h4>
              <span>tranvantri270802@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-content pt-5 pb-5">
      <div className="row">
        <div className="col-xl-4 col-lg-4 mb-50">
          <div className="footer-widget">
            <div className="footer-text">
              <p>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing
                elit,Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="footer-social-icon">
              <span>Theo dõi chúng tôi tại:</span>
              <a href="https://www.facebook.com/profile.php?id=100007816249120"><i class="bi bi-facebook"/></a>
              <a href="https://www.instagram.com/trivan77/"><i class="bi bi-instagram"/></a>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
          <div className="footer-widget">
            <div className="footer-widget-heading">
              <h3>Useful Links</h3>
            </div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/product">Sản phẩm</Link></li>
              <li><Link to="/contact">Liên hệ</Link></li>
            
            </ul>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
          <div className="footer-widget">
            <div className="footer-widget-heading">
              <h3>Đăng ký</h3>
            </div>
            
            <div className="subscribe-form">
              <form action="#">
                <input type="text" placeholder="Email Address" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
        </>
    )
}
export default Footer