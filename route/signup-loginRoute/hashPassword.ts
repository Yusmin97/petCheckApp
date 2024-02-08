import bcrypt from 'bcrypt';

// 비밀번호 해싱 함수
export async function hashPassword(password: string): Promise<string> {
    try {
        // 비밀번호 해싱
        const saltRounds = 10; // 솔트 라운드 수를 정의합니다. 높을수록 보안이 높아집니다.
        const hashedPassword: string = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

// 비밀번호 검증 함수
export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    try {
        // 저장된 해시된 비밀번호와 사용자가 제공한 비밀번호를 비교합니다.
        const isMatch: boolean = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
}
