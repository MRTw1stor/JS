// #include <iostream>
// #include <cmath>

// int main(){
//     int C,P,D;
//     printf("\nenter number C=");
//     scanf("%d",&C);
//     printf("\nenter number P=");
//     scanf("%d",&P);
//     printf("\nenter number D=");
//     scanf("%d",&D);
    
//     const int result1 = sqrt(C) + sqrt(P) + sqrt(D);
//     printf("\nsum of square roots of entered numbers=%d",result1, "\n");
    
//     std::cout << std::endl;
    
//     const int result2 = C*P*D;
//     printf("\nproduct of entered numbers=%d",result2);
// }

#include <iostream>
#include <cmath>

int main(){
    double a,b,y;
    printf("\nenter number a=");
    scanf("%lf",&a);
    printf("\nenter number b=");
    scanf("%lf",&b);
    printf("\nenter number y=");
    scanf("%lf",&y);
    
    const auto result = 7*y + 3+(sin(a)) + sqrt(pow(b, 2) + 19) / 7 * y + sqrt(pow(b, 2) + 19) + 2;
    printf("\nresult=%lf",result);
}