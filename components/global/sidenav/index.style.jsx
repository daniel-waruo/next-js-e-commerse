export default ({width} = {width:250} ) =>
`
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 5;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidenav-open {
  width: ${width}px;
}

.sidenav.navlink {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav.navlink:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }

  .sidenav.navlink {
    font-size: 18px;
  }
}

@media (max-width: 991.98px) {
  .sidenav-open {
    width: 100% !important;
  }
}
`