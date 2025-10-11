#include <iostream>
#include <limits>
using namespace std;

int main() {
    int maxLen, minVal = 1, maxVal = 100;

    // Get valid array size
    cout << "Enter maximum array size: ";
    while (!(cin >> maxLen) || maxLen <= 0) {
        cout << "Invalid input! Enter a positive number: ";
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
    }

    int* arr = new int[maxLen]; // dynamic array
    int count = 0;

    cout << "Enter up to " << maxLen << " unique numbers between " 
         << minVal << " and " << maxVal << ":\n";

    while (count < maxLen) {
        int temp;
        cout << "Number " << count + 1 << ": ";
        if (!(cin >> temp)) { // non-numeric input
            cout << "Invalid input! Enter a numeric value.\n";
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            continue;
        }

        if (temp < minVal || temp > maxVal) { // value range
            cout << "Out of range! Must be between " << minVal << " and " << maxVal << ".\n";
            continue;
        }

        bool duplicate = false;
        for (int i = 0; i < count; i++) { // check duplicates
            if (arr[i] == temp) { duplicate = true; break; }
        }
        if (duplicate) { cout << "Duplicate detected! Try again.\n"; continue; }

        arr[count++] = temp;
    }

    cout << "\nFinal array: ";
    for (int i = 0; i < count; i++) cout << arr[i] << " ";
    cout << endl;

    delete[] arr; 
    return 0;
}

