export default function Post(){
    return(
        <div className='post'>
        <div className='image'>
          <img src='https://miro.medium.com/v2/resize:fit:828/format:webp/1*rROQPZHRJ0b95NWULBU4Ow.jpeg'/>
        </div>

        <div className='texts'>
          <h2>Review: Next-Gen 2025 Ford F-250 Super Duty Truck</h2>
          <p className="info">
            <a className='author'>S.K Metha</a>
            <time>2024-03-28 3:30 PM</time>
          </p>
          <p className='summary'>Currently, the automotive industry has a lot of interest in pickup truck models, with Ford’s most basic model being the F-Series Super Duty. This Ford truck model also has the best hauling and towing capabilities.</p>
        </div>
      </div>
    )
}