import React, { useEffect, useState } from "react" 

interface ISVGIcon {
    url: string 
    alt: string 
    className: string
}

const SVGIcon = ({ url, alt, className }: ISVGIcon) => {
    const [svgContent, setSvgContent] = useState<string | null>(null)
    let fillColor = localStorage.getItem("color-theme") === "dark" ? "white" : "black"

    useEffect(() => {
        const fetchSvg = async () => {
            try {
                const response = await fetch(url) 
                if (response.ok) {
                    let text = await response.text() 
                    if (fillColor) {
                        text = text.replace(/fill="(.*?)"/g, `fill="${fillColor}"`) 
                    }
                    setSvgContent(text) 
                } else {
                    setSvgContent(null) 
                }
            } catch {
                setSvgContent(null) 
            }
        } 

        fetchSvg() 
    }, [url, fillColor]) 

    if (svgContent) {
        return (
            <div aria-label={alt}
                 dangerouslySetInnerHTML={{
                     __html: svgContent.replace("<svg", `<svg class="${className}"`),
                 }}
            />
        ) 
    } else {
        return <div className={`empty-svg ${className}`} aria-label={alt} /> 
    }
} 

export default SVGIcon 
