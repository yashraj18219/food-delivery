import { sum } from "../Sum";

test("Function to find the sum of two numbers", ()=>{
        const result = sum(3,4);
        expect(result).toBe(7);
});