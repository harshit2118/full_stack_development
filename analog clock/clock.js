setInterval(()=> {
    date = new Date();
    hHOURS     = date.getHours();
    mMINUTE    = date.getMinutes();
    sSecond    = date.getSeconds();
    h_rotation = (30*hHOURS)+(mMINUTE/2)+(sSecond/120);
    m_rotation =  6*mMINUTE+sSecond/10;
    s_rotation =  sSecond*6;

    document.getElementById("hour").style.transform = "rotate("+ hHOURS +"deg)";
    document.getElementById("minute").style.transform = "rotate("+ mMINUTE +"deg)";
    document.getElementById("second").style.transform = "rotate("+ sSecond +"deg)";
}, 1000);
