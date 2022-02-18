# import os
# os.system("g++ ./python/test.cpp -o ./python/test")
# os.system('./python/test')
# print("Perfect Credit!")

import os
import time
import sys
from shutil import copyfile

print("!!!!!!!!!!!!!!!!!!!!!!!")

# Change Area
Arg = sys.argv[1].split()
FileName = Arg[0]
ExeName = FileName.split('.')[0]
ProblemNum = Arg[1]
print(FileName, ProblemNum)
JudgeFileNum = 11 # 1 to 10 [, )
ProblemDirName = "python"

os.system("g++ " + FileName + " -o " + ExeName)

fileList = os.listdir("./{}/{}".format(ProblemDirName, ProblemNum))

for fileName in fileList:
    copyfile("./{}/{}/{}".format(ProblemDirName, ProblemNum, fileName), "./{}".format(fileName))

for _ in range(1, JudgeFileNum):
    os.rename("./{}.inp".format(_), "./{}.inp".format(ExeName)) #  _.inp to Change ExeName.inp

    startTime = time.time()
    os.system("./{}".format(ExeName))
    endTime = time.time()

    Time = endTime - startTime
    if(Time >= 1):
        print("{},0,{:.5f},Timeout".format(_, Time))
        os.remove(str(_) +".out")
        continue

    # print("Execute Time : %5fs"%(Time), end="       ")

    # os.rename("{}.out".format(ExeName), "./{}.out".format(ExeName))

    with open("./{}.out".format(ExeName), 'r') as Question: # dish.out (Question)
        QuestionDiff = [Temp.strip() for Temp in Question.read().splitlines()]
    with open("./{}.out".format(_), 'r') as Answer: # 1.out(Answer)
        AnswerDiff = [Temp.strip() for Temp in Answer.read().splitlines()]

    QuestionCheck = True # Right or Wrong Check

    if(len(AnswerDiff) != len(QuestionDiff)): # diff Len is Wrong Answer
        print("{},0,{:.5f},Different File Format".format(_, Time))
        QuestionCheck = False
        continue
    
    for i in range(0, len(AnswerDiff)):
        if(AnswerDiff[i] != QuestionDiff[i]): # diff Contents is Wrong Answer
            QuestionCheck = False
            print("{},0,{:.5f},Wrong Answer".format(_, Time))
            break
    
    if QuestionCheck:
        print("{},10,{:.5f},Perfect Credit".format(_, Time))

    os.remove(str(_) +".out")

os.remove(str(ExeName)+".inp")
os.remove(str(ExeName)+".out")
# os.remove(str(FileName))
os.remove(str(ExeName))