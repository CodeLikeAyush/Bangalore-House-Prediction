import sys
import joblib
import pandas as pd


model = joblib.load('../linear_reg_model.joblib')
transformer = joblib.load('../transformer.joblib')

# new_data = pd.DataFrame({'location': ['1st Block Jayanagar'], 'size': ['4 BHK'], 'availability': ['Ready To Move'], 'total_sqft': [2850.0], 'bath': [4.0], 'bhk': [4]})
arg1 = (sys.argv[1])
arg2 = int(sys.argv[2])
arg3 = int(sys.argv[3])
arg4 = int(sys.argv[4])

new_data = pd.DataFrame({'location': [arg1], 'total_sqft': [arg2], 'bath': [arg3], 'bhk': [arg4]})

input = transformer.transform(new_data)

output = model.predict(input)

# print(arg1)
# print(arg2)
# print(arg3)
# print(arg4)
# print(output[0])

print('"location":"{}","area":{},"bathroom":{},"bhk":{},"price":{}'.format(arg1,arg2,arg3,arg4,output[0]))

sys.stdout.flush()

