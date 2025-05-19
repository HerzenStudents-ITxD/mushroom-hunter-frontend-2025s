import { useMushrooms } from "../contexts/MushroomContext";

export default function MushroomCounter() {
    const { collected, total } = useMushrooms();

    return (
        <div style={{
            position: 'absolute',
            top: 10,
            left: 10,
            color: 'white',
            fontSize: '24px',
            background: 'rgba(0,0,0,0.5)',
            padding: '10px',
            borderRadius: '5px',
            fontFamily: 'sans-serif',
        }}>
            Грибы: {collected.length} / {total}
        </div>
    );
}
