import React, { useEffect, useState } from 'react';
import './About.scss';
export default function AboutCard({cardIcon, title, body}) {
  return (
    <a className='btn btn-outline-dark border-0' type='button'>
    <div className='d-flex gap-1'>
  <div class="col-3">
  {cardIcon}
  </div>
  <div className="col-9 text-start">
    <h5 className="fw-bold">{title}</h5>
    <p>{body}</p>
  </div>
</div>
</a>
  )
}