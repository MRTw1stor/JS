const pasword = 'qaz-xsw'

if (pasword.length >= 4 && (pasword.includes('-')|| pasword.includes('_'))) {
    console.log("Пароль надежный");
} 
else {
    console.log("пароль ненадежный");
}