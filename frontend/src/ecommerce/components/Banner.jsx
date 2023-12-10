import React from 'react'
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

export const Banner = () => {

  let settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};


  return (
    <div className="">
      <Slider {...settings}>
        <div className="slider-item">
          <img className='w-full h:[30rem] md:h-[35rem]' src="https://i2.wp.com/blog.arthellin.com/wp-content/uploads/2019/11/banner-ropa-laboral.png" alt="" />
            <Link to='/ecommerce/contactenos' className="text-xs absolute bottom-80 right-[10rem] z-50 bg-slate-900 text-white rounded-full px-4 py-2 hover:bg-slate-600 sm:text-xl px-8 py-3 bottom-80 right-20">Contactenos</Link>
        </div>
        <div className="slider-item">
          <img className='w-full h:[30rem] md:h-[35rem]' src="https://previews.123rf.com/images/sergeypykhonin/sergeypykhonin1705/sergeypykhonin170500095/79248250-compras-banner-de-boutique-concepto-de-tienda-de-moda-ilustraci%C3%B3n-vectorial.jpg" alt="" />
            <Link to='/ecommerce/contactenos' className="text-xs absolute bottom-80 right-[10rem] z-50 bg-slate-900 text-white rounded-full px-4 py-2 hover:bg-slate-600 sm:text-xl px-8 py-3 bottom-80 right-20">Contactenos</Link>
        </div>

        <div className="slider-item">
          <img className='w-full h:[30rem] md:h-[35rem]' src="https://images.template.net/108414/fashion-sale-banner-template-85svg.jpg" alt="" />
            <Link to='/ecommerce/contactenos' className="text-xs absolute bottom-80 right-[10rem] z-50 bg-slate-900 text-white rounded-full px-4 py-2 hover:bg-slate-600 sm:text-xl px-8 py-3 bottom-80 right-20">Contactenos</Link>
        </div> 

        


      </Slider>
        
  </div>
  )
}
