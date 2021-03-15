import React, { useState } from 'react'
import { Modal, Button } from 'antd';
export default function Carousel() {
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const showModal = () => {
        setVisible(true);
    };
    const showModal1 = () => {
        setVisible1(true);
    }
    const showModal2 = () => {
        setVisible2(true);
    }
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
        setVisible1(false);
        setVisible2(false);
    };
    const handleOk = () => {
        setVisible(false);
        setVisible1(false);
        setVisible2(false);
    }
    return (
        <div >
            {/* data-ride="carousel"data-ride="carousel" */}
            <div id="carouselExampleIndicators" className="carousel slide" data-interval="false" >
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                    <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                    <li data-target="#carouselExampleIndicators" data-slide-to={2} />
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active item1">
                        <div class="carousel-caption ">
                            <h5>The Avengers</h5>
                           
                            <Button className="btn btn-trailer" type="primary" onClick={showModal}>
                                <span><i class="fa fa-play mr-2"></i></span>
                               Trailer
                             </Button>
                        </div>
                        <Modal
                            title="Title"
                            onOk={handleOk}
                            visible={visible}
                            onCancel={handleCancel}
                        >
                            <iframe width={560} height={315} src="https://www.youtube.com/embed/SLD9xzJ4oeU" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />

                        </Modal>

                    </div>
                    <div className="carousel-item item2">
                        <div class="carousel-caption">
                            <h5>Jurassis world</h5>
                          
                            <Button className="btn btn-trailer" type="primary" onClick={showModal1}>
                                <span><i class="fa fa-play mr-2"></i></span>
                               Trailer
                             </Button>
                        </div>
                        <Modal
                            title="Title"
                            onOk={handleOk}
                            visible={visible1}
                            onCancel={handleCancel}
                        >
                            <iframe width={560} height={315} src="https://www.youtube.com/embed/e0_96_YQu0k" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        </Modal>
                    </div>
                    <div className="carousel-item item3">
                        <div class="carousel-caption">
                            <h5>The Conjuring</h5>
                           
                            <Button className="btn btn-trailer" type="primary" onClick={showModal2}>
                                <span><i class="fa fa-play mr-2"></i></span>
                               Trailer
                            </Button>
                        </div>

                    </div>
                    <Modal
                        title="Title"
                        onOk={handleOk}
                        visible={visible2}
                        onCancel={handleCancel}
                    >
                        <iframe width={560} height={315} src="https://www.youtube.com/embed/VFsmuRPClr4" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />

                    </Modal>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                </a>
            </div>


        </div>
    )
}
