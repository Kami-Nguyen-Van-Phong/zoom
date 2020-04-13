import React, { Component } from 'react'

export class SVG extends Component {
    constructor() {
        super();
        this.state = {
            scaleX: 1,
            scaleY: 1,
            transX: 0,
            transY: 0,
            transOutX: 0,
            transOutY: 0,
            pointPrevX:0,
            pointPrevX:0,
            x: 10,
            y: 10
        }
        this.scale = 1.1;
    }

    handleScale = (e) => {
        const xSVG = this.state.x + this.state.transX - this.state.transOutX;
        const ySVG = this.state.y + this.state.transY - this.state.transOutY;
        const transX = (this.scale - 1) * (xSVG) + this.state.transX;
        const transY = (this.scale - 1) * (ySVG) + this.state.transY;

        this.setState({
            transX,
            transY,
            scaleX: this.state.scaleX * this.scale,
            scaleY: this.state.scaleY * this.scale,
        });
    }

    handleMouseMove = (e) => {
        const pointX = e.clientX;
        const pointY = e.clientY;
        this.setState({
            x: pointX,
            y: pointY
        })
    }

    handleMouseClick = (e)=>{
        const pointPrevX = e.clientX;
        const pointPrevY = e.clientY;
        this.setState({
            x: pointPrevX,
            y: pointPrevY
        })
    }

    handleCreateRect=()=>{
        
    }

    componentDidMount() {
        window.addEventListener("mousewheel", this.handleScale);
        document.addEventListener("mousemove", this.handleMouseMove)
    }
    render() {
        return (
            <div>
                <svg width="500" height="500" style={{ 'display': 'block' }}>
                    <rect fill="#616264" x="0" y="0" width="100%" height="100%" style={{ 'pointer-events': 'none' }}></rect>
                    <g transform={` translate(${this.state.transOutX},${this.state.transOutY}) translate(-${this.state.transX},-${this.state.transY}) scale(${this.state.scaleX} ${this.state.scaleY})`}>
                        <g stroke-width="4" stroke="red"   >
                            <circle cx="108" cy="108.5" r="100" fill="yellow"></circle>
                            <g stroke-width="4" stroke="orange"   >
                                <circle cx="108" cy="108.5" r="50" fill="green"></circle>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
        )
    }
}
export default SVG