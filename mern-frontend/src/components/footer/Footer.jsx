import './Footer.css'

const Footer = (props) => {

    return (
        <footer>
        <div className="footerContainer">

        <div className="copyright">
            <p>Copyright &copy; 2024 by Cora Love, Amadou Diallo, Chris Lee</p>
        </div>
        <div className="footerCommonLinks">
        <ul>
            <li><a href="https://www.google.com">Security</a></li>
            <li><a href="https://www.google.com">Privacy Policy</a></li>
            <li><a href="https://www.google.com">Manage Cookies</a></li>
            <li><a href="https://www.google.com">Contact Us</a></li>
            <li><a href="https://www.google.com">Legal</a></li>
            <li><a href="https://www.google.com">Accessibility</a></li>
        </ul>
        </div>

        </div>
        </footer>
    )

}

export default Footer;