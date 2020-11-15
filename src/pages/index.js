import React from "react"
import Layout from "../layouts/layout"

import img from "../images/sky_0_stars_up.png";

import "../styles.scss"

export default function HomePage() {
  return (
    <Layout>
      <h1>Amazing Pandas Eating Things</h1>
      <img src={img} width={400}/>
    </Layout>
  )
}