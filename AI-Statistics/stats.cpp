#include <iostream>
#include <cmath>
#include <fstream>
#include <string>
#include <sstream>
#include <string.h>
#include <cstdlib>
#include <stdlib.h>
#include <stdio.h>

using namespace std;

double average(double [],int);
double sd (double [],int);
void length(int & , string &);
void read(double [],string, int n);



int main() 
{
string name;

int n=0;
length(n,name);
double *Data;
Data= new double [n];
read(Data,name,n); 
cout<<average(Data,n)<<" "<<sd(Data,n)<<endl;

delete [] Data;
return 0;
//-------------------------------------------------------------------------------------------------------------
}


//-------------------------------------------------------------------------------------------------------
double average(double array[],int n)
{
  double result=0;
  for(int i=0;i<n;i++)
  {    
    result=result+array[i];     
  }
  
  return result/n;
}
//-------------------------------------------------------------------------------------------------------
double sd (double array[],int n) 
{
  double result=0;
  double x=average(array,n);
  for(int i=0;i<n;i++)
  {
    result=result+(array[i]-x)*(array[i]-x);   
  }
  return sqrt(result/(n-1)); 
}
//----------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
void length(int &n, string &name)
{
  n=0;
  double b;
  cout<<"Please insert the name of the file without quotes: "<<endl;
  cin>>name;
  cout<<name<<endl;
  ifstream dat(name.c_str());
  while(!dat.eof())
  {
    dat>>b;
    n++;
  }
  dat.clear(); 
  dat.seekg( 0, ios_base::beg );
}
//--------------------------------------------------------------------------------------------------------------------
void read(double Data[],string name,int n)
{
  ifstream dat(name.c_str());
  double b;  
  for(int i=0;i<n;i++){
    dat>>b;
    Data[i]=b;
    cout<<Data[i]<<" "<<i+1<<endl;
  }
  if(Data[n-1]==Data[n-2])
  {
    int d;
    cout<<"Are you sure this is your last value?"<<endl;
    cout<<Data[n]<<endl;
    cout<<"For yes press 1, for no 0."<<endl;
    cin>>d;
    if(d==0)
    {
      cout<<"Please delete the empty line at the bottom of your file"<<endl;
      dat.clear(); 
      dat.seekg( 0, ios_base::beg );
      read(Data,name,n-1);
    }     
  }
}
