import React, { Component } from 'react'
import Hero from "../components/Hero"
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'

export default class Error extends Component {
    render() {
        return (
            <Hero>
                <Banner
                    title="404"
                    subtitle="يبدوا ان الصفحة غير متوفره">
                    <Link to="/" className="btn-primary">العودة الى الصفحة الرئيسية</Link>
                </Banner>
            </Hero>
        )
    }
}
