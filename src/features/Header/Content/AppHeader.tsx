import React from 'react';
import '../css/AppHeader.css';

const AppHeader: React.FC = () => {
  return (
    <header id="header" className="app-header" style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
      {/* Top Header */}
      <div className="app-header-container-fruid app-header-top-header app-header-navbar-fixed-top">
        <div className="app-header-container">
          <div className="app-header-row">
            <div className="app-header-col-md-6 app-header-no-padding">
              <ul>
                <li>
                  <a href="mailto:info@saigontourist.net">
                    <i className="fa fa-envelope"></i>
                    info@saigontourist.net
                  </a>
                </li>
                <li>
                  <a className="app-header-ticket-hotline" href="tel:1900 1808">
                    <i className="fa fa-phone"></i>
                    Hotline: 1900 1808
                  </a>
                </li>
              </ul>
            </div>
            <div className="app-header-col-md-6">
              <ul id="w0" className="app-header-login-container">
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={() => document.getElementById('region')?.classList.add('show')}
                    className="app-header-login-href"
                  >
                    <i className="fa fa-map-marker"></i>
                    Chọn điểm khởi hành
                  </a>
                </li>
                <li>
                  <a href="/vi/login" className="app-header-login-href">
                    <i className="fa fa-sign-in" aria-hidden="true"></i>
                    Đăng nhập
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://www.etravelvietnam.com/"
                    className="app-header-login-href"
                  >
                    <i className="flag-english"></i>
                    English
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="app-header-container">
        <nav className="app-header-navbar app-header-navbar-default app-header-navbar-main app-header-navbar-fixed-top" role="navigation">
          <div className="app-header-container">
            {/* Navbar Header */}
            <div className="app-header-navbar-header">
              <button
                type="button"
                className="app-header-navbar-toggle"
                data-toggle="collapse"
                data-target=".app-header-navbar-ex1-collapse"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="app-header-icon-bar"></span>
                <span className="app-header-icon-bar"></span>
                <span className="app-header-icon-bar"></span>
              </button>
              <a className="app-header-navbar-brand" href="/"></a>
            </div>

            {/* Navbar Collapse */}
            <div className="collapse app-header-navbar-collapse app-header-navbar-ex1-collapse">
              <ul className="app-header-nav app-header-navbar-nav app-header-navbar-right">
                <li className="app-header-dropdown app-header-searchBox app-header-search">
                  <a
                    href="#"
                    className="app-header-dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="app-header-searchIcon">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </a>
                  <ul className="app-header-dropdown-menu app-header-dropdown-menu-right">
                    <li>
                      <form
                        id="searchFormLayoutMobile"
                        method="get"
                        role="form"
                        className="app-header-form-search-layout-mobile"
                        action="/tim-kiem-tour"
                      >
                        <div className="app-header-serch-box-layout-input-mobile">
                          <input
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') e.preventDefault();
                            }}
                            type="text"
                            name="search"
                            className="app-header-input-search-kiritm"
                            id="inputSearchLayoutMobile"
                            autoComplete="off"
                            placeholder="Tìm kiếm..."
                            aria-describedby="basic-addon2"
                          />
                          <i
                            className="fa fa-search fa-kiritm"
                            id="basic-addon2"
                            onClick={() => (document.getElementById('searchFormLayoutMobile') as HTMLFormElement)?.submit()}
                          ></i>
                        </div>
                      </form>
                    </li>
                  </ul>
                </li>
                <li className="app-header-dropdown app-header-singleDrop">
                  <a href="/vi/">TRANG CHỦ</a>
                </li>
                <li className="app-header-dropdown app-header-megaDropMenu">
                  <a href="/vi/tour-trong-nuoc" className="app-header-dropdown" data-hover="dropdown" data-delay="300">
                    TOUR TRONG NƯỚC
                  </a>
                  <ul className="app-header-row app-header-dropdown-menu">
                    <li className="app-header-col-sm-3 app-header-col-xs-12">
                      <ul className="app-header-list-unstyled">
                        <li>Miền Bắc</li>
                        <li>
                          <a href="/vi/tour/tour-ha-noi">Hà Nội</a>
                        </li>
                        <li>
                          <a href="/vi/tour/tour-sapa">Sapa</a>
                        </li>
                        <li>
                          <a href="/vi/tour/tour-ha-long">Hạ Long</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
