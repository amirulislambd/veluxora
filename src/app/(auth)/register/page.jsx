import Image from 'next/image';
import steeringWheel from '@/assets/steeringWheel.png'

const RegisterPage = () => {
    return (
        <div>
            <div>
                <Image width={450} height={450} src={steeringWheel}/>
            </div>
            <div>
                <form>
                    
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;