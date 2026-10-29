function Main_Menu(){
    return(
        <>
        <div className="Menu-NavBar">
            <img className="img-icon" src="./src/assets/favicon.png" alt="icon.png" width="100" height="100"/>
            <h1 className="MenuTitle">CarFix: nền tảng sửa xe tại chỗ</h1>
            <aside className="NavButtons">
                <button className="MenuNavButton" onClick={()=> {window.location.href="https://www.youtube.com"}}>Tìm cứu hộ</button>
                <button className="MenuNavButton" onClick={()=> {window.location.href="https://www.youtube.com"}}>Đặt dịch vụ</button>
                <button className="MenuNavButton" onClick={()=> {window.location.href="https://www.youtube.com"}}>Đơn của tôi</button>
                <button className="MenuNavButton" onClick={()=> {window.location.href="https://www.youtube.com"}}>Garage/Thợ</button>
                <button className="MenuNavButton" onClick={()=> {window.location.href="https://www.youtube.com"}}>Bảng giá</button>
            </aside>
        </div>

        <div>
            <img src="./src/assets/introductory_Image.png" alt="Intro"/>
            <svg width="100" height="100">
                <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
            </svg>

            <svg width="100" height="100">
                <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
            </svg>

            <svg width="100" height="100">
                <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
            </svg>

            <svg width="100" height="100">
                <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
            </svg>
        </div>

        </>
    );
}

export default Main_Menu