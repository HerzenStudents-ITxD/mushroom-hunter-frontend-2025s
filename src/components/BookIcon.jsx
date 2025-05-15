export default function BookIcon({onKlick}){
    return(
        <div style={{
            position:"absolute", 
            top: 20,
            right: 20,
            backgroundColor:"rgba(0,0,0,0)",
            padding:"10px 12px",
            borderRadius:"8px",
            cursor:"pointer",
            fontSize:"20px",
            fontWeight:"bold",
            zIndex: 1000,
            display: "inline-flex",
            gap:"8px",
            alignItems:"center",
            color:"#000",
        }} 
        onClick={onKlick}
        title="нажмите T чтобы открыть книгу"
        >
            <span role="img" aria-label="book" style={{fontSize:"50px"}}>
                📖
            </span>
            <span style={{whiteSpace:"nowrap"}}>
                [T] книга
            </span>
        </div>
    )
}