import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div className="fixed-bottom footer">
        <footer className="page-footer font-small blue">
          <div className="footer-copyright text-center py-3">
            © 2020 Copyright:&nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://persistent.com/"
            >
              Persistent.com
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
