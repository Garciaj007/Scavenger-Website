import Typography from "typography"

const typography = new Typography({
    title: "Willow",
    baseFontSize: '18px',
    baseLineHeight: 1.666,
    googleFonts: [
        {
            name: 'Libre Barcode 128 Text',
            styles: [
                '400'
            ]
        }, 
        {
            name: 'Rajdhani',
            styles: [
                '300',
                '400',
                '700'
            ]
        }
    ],
    scaleRatio: 6.85,
    headerFontFamily: ['Libre Barcode 128 Text', 'sans-serif'],
    headerWeight: 300,
    bodyFontFamily: ['Rajdhani', 'serif'],
});

export default typography
export const rhythm = typography.rhythm