import React, { Component } from 'react';
import './zoom-svg.css';
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

export class ZoomSVG extends Component {

    constructor() {
        super();
        this.state = {
            imageDestination: ""
        };
        this.imageElement = React.createRef();
    }

    handleDragMove = () => {

    }

    componentDidMount() {
        const cropper = new Cropper(this.imageElement.current, {
            zoomable: true,
            scalable: false,
            aspectRatio: 1,
            crop: () => {
                const canvas = cropper.getCroppedCanvas({
                    width: 160,
                    height: 90,
                    minWidth: 160,
                    minHeight: 90,
                    maxWidth: 160,
                    maxHeight: 90,
                    fillColor: '#fff',
                    imageSmoothingEnabled: true,
                    imageSmoothingQuality: 'high',
                });
                this.setState({ imageDestination: canvas.toDataURL("image/png") });
            }
        });
    }

    render() {
        return (
            <div>
                <div className="img-container">
                    <img ref={this.imageElement} src={this.props.src} alt="Source" />
                </div>
                <img src={this.state.imageDestination} className="img-preview" alt="Destination" />
            </div>
        )
    }
}

export default ZoomSVG
