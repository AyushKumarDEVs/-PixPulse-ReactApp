import React from 'react'

function Logo({
  src="https://imgs.search.brave.com/fp4fDtwBmPJKyooJUELfRwEI8a87HqpBnqQYrCgW_Bw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQy/NDY0OTY4Mi92ZWN0/b3IvY3JlYXRpdmUt/bGV0dGVyLXAtcHAt/bG9nby1kZXNpZ24u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PW9JZmwwLUdKYU9h/d0FCOWE2TUtYbmZf/NkdsU1RsYlRhd1RX/dXI5bklBdU09",
  prop}) {
  return (
    <img className={prop} src={src? src :"https://imgs.search.brave.com/fp4fDtwBmPJKyooJUELfRwEI8a87HqpBnqQYrCgW_Bw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQy/NDY0OTY4Mi92ZWN0/b3IvY3JlYXRpdmUt/bGV0dGVyLXAtcHAt/bG9nby1kZXNpZ24u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PW9JZmwwLUdKYU9h/d0FCOWE2TUtYbmZf/NkdsU1RsYlRhd1RX/dXI5bklBdU09"} alt="logo" />
  )
}

export default Logo