import React, { Suspense } from 'react'
import daBody from '../../Styles/Dashboard/doctor/Dashboard.module.css'
const Img = React.lazy(() => import("./Img"))

const LazyImage = (props) => {
    const { url, width, height } = props;

    return (
        <Suspense fallback={<div className={daBody.loader}></div>}>
            <Img src={url} width={width} height={height} alt='' />
        </Suspense>
    )
}


export default LazyImage