
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CreditCard, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface BookingFlowProps {
  serviceName: string;
  price: number;
  onBookingComplete: () => void;
}

const BookingFlow: React.FC<BookingFlowProps> = ({ serviceName, price, onBookingComplete }) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [bookingData, setBookingData] = useState({
    carId: '',
    date: '',
    time: '',
    pickupAddress: '',
    deliveryAddress: '',
    specialInstructions: ''
  });

  const isStepValid = () => {
    switch (step) {
      case 1:
        return bookingData.carId !== '';
      case 2:
        return bookingData.date !== '' && bookingData.time !== '';
      case 3:
        return bookingData.pickupAddress !== '';
      case 4:
        return true; // Payment step is always valid for demo
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!isStepValid()) {
      toast({
        title: "Please complete all required fields",
        description: "Fill in the required information before proceeding.",
        variant: "destructive"
      });
      return;
    }

    if (step < 4) {
      setStep(step + 1);
      toast({
        title: "Step completed!",
        description: `Moving to step ${step + 1}`,
      });
    } else {
      onBookingComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateBookingData = (field: string, value: string) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-center space-x-2 mb-8">
        {[1, 2, 3, 4].map((stepNum) => (
          <div key={stepNum} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
            stepNum <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {stepNum}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {step === 1 && <><Car className="h-5 w-5" /><span>Select Vehicle</span></>}
            {step === 2 && <><Calendar className="h-5 w-5" /><span>Choose Date & Time</span></>}
            {step === 3 && <><MapPin className="h-5 w-5" /><span>Pickup & Delivery</span></>}
            {step === 4 && <><CreditCard className="h-5 w-5" /><span>Payment</span></>}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {step === 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select your vehicle *
              </label>
              <Select onValueChange={(value) => updateBookingData('carId', value)} value={bookingData.carId}>
                <SelectTrigger className={bookingData.carId === '' ? 'border-red-300' : ''}>
                  <SelectValue placeholder="Choose a car from your profile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car1">Dubai A12345 - 2022 Toyota Camry</SelectItem>
                  <SelectItem value="car2">Abu Dhabi B67890 - 2021 BMW X5</SelectItem>
                  <SelectItem value="car3">Sharjah C54321 - 2023 Mercedes C-Class</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input 
                  type="date" 
                  className={`w-full p-2 border rounded-md ${bookingData.date === '' ? 'border-red-300' : 'border-gray-300'}`}
                  value={bookingData.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => updateBookingData('date', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <Select onValueChange={(value) => updateBookingData('time', value)} value={bookingData.time}>
                  <SelectTrigger className={bookingData.time === '' ? 'border-red-300' : ''}>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="14:00">02:00 PM</SelectItem>
                    <SelectItem value="16:00">04:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Address *
                </label>
                <Textarea 
                  placeholder="Enter pickup address"
                  value={bookingData.pickupAddress}
                  className={bookingData.pickupAddress === '' ? 'border-red-300' : ''}
                  onChange={(e) => updateBookingData('pickupAddress', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address
                </label>
                <Textarea 
                  placeholder="Enter delivery address (or leave blank for same as pickup)"
                  value={bookingData.deliveryAddress}
                  onChange={(e) => updateBookingData('deliveryAddress', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions (Optional)
                </label>
                <Textarea 
                  placeholder="Any special requirements or notes"
                  value={bookingData.specialInstructions}
                  onChange={(e) => updateBookingData('specialInstructions', e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span>{serviceName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vehicle:</span>
                    <span>{bookingData.carId === 'car1' ? '2022 Toyota Camry' : bookingData.carId === 'car2' ? '2021 BMW X5' : '2023 Mercedes C-Class'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date & Time:</span>
                    <span>{bookingData.date} at {bookingData.time}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Price:</span>
                    <span className="text-blue-600">{price} AED</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Button className="w-full" onClick={onBookingComplete}>
                  Pay with Credit Card - {price} AED
                </Button>
                <Button variant="outline" className="w-full" onClick={onBookingComplete}>
                  Pay with Tabby (4 payments of {Math.round(price/4)} AED)
                </Button>
                <Button variant="outline" className="w-full" onClick={onBookingComplete}>
                  Pay with Tamara
                </Button>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            <Button 
              onClick={handleNext} 
              className={step === 1 ? "w-full" : ""}
              disabled={!isStepValid()}
            >
              {step === 4 ? 'Complete Booking' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingFlow;
