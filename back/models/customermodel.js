const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const districtsOfKerala = [
    "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam", 
    "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram", 
    "Kozhikode", "Wayanad", "Kannur", "Kasaragod"
];

const customerSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true,
        validate: {
          validator: function (value) {
            return /^[A-Za-z\s]+$/.test(value);
          },
          message: "Name must contain only alphabets and spaces"
        }
      },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    phone: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^[6-9]\d{9}$/, "Invalid phone number"]
    },
    password: { type: String, required: true },
    address: [
        {
            location: String,
            pincode: { 
                type: String, 
                validate: {
                    validator: function(value) {
                        return /^\d{6}$/.test(value);
                    },
                    message: "Pincode must be 6 digits"
                }
            },
            landmark: String,
            district: {
                type: String,
                enum: districtsOfKerala,
                required: true
            }
        }
    ]
}, { timestamps: true });

// Hash password before saving
customerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
