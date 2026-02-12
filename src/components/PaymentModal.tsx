import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { 
  CreditCard, 
  X, 
  Shield, 
  Lock, 
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const stripePromise = loadStripe("pk_test_51234567890abcdefghijklmnopqrstuvwxyz"); // Replace with your Stripe publishable key

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultant: {
    id: number;
    name: string;
    title: string;
    hourlyRate: number;
    avatar: string;
    avatarUrl?: string;
  };
  projectTitle: string;
  estimatedHours: number;
}

interface PaymentFormData {
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  consultant, 
  projectTitle, 
  estimatedHours 
}: PaymentModalProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"details" | "payment" | "processing" | "success">("details");
  const [formData, setFormData] = useState<PaymentFormData>({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });

  const totalAmount = consultant.hourlyRate * estimatedHours;
  const platformFee = Math.round(totalAmount * 0.1); // 10% platform fee
  const grandTotal = totalAmount + platformFee;

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ').substr(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === "details") {
      if (!formData.email) {
        toast({ title: "Email required", description: "Please enter your email address.", variant: "destructive" });
        return;
      }
      setStep("payment");
      return;
    }

    if (step === "payment") {
      // Validate payment form
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardholderName) {
        toast({ title: "Missing information", description: "Please fill in all payment details.", variant: "destructive" });
        return;
      }

      setIsProcessing(true);
      setStep("processing");

      // Simulate payment processing
      try {
        // In a real implementation, you would use Stripe Elements here
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setStep("success");
        toast({ 
          title: "Payment Successful!", 
          description: `Payment of $${grandTotal.toLocaleString()} has been processed successfully.` 
        });
      } catch (error) {
        toast({ 
          title: "Payment Failed", 
          description: "There was an error processing your payment. Please try again.", 
          variant: "destructive" 
        });
        setStep("payment");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleClose = () => {
    if (step === "processing") return; // Don't allow closing during processing
    onClose();
    // Reset form after a delay to allow exit animation
    setTimeout(() => {
      setStep("details");
      setFormData({
        email: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardholderName: ""
      });
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="bg-background rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">
                  {step === "success" ? "Payment Complete" : "Secure Payment"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {step === "success" ? "Your project has been funded" : "Powered by Stripe"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              disabled={step === "processing"}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Payment Successful!</h3>
                <p className="text-muted-foreground mb-6">
                  Your payment of ${grandTotal.toLocaleString()} has been processed. {consultant.name} will be notified and can begin working on your project.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <div className="text-sm text-muted-foreground mb-2">Transaction ID</div>
                  <div className="font-mono text-sm">TXN_{Date.now()}_{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                </div>
                <Button onClick={handleClose} className="w-full">
                  Go to Dashboard
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Summary */}
                <Card className="bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-primary">{consultant.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm truncate">{consultant.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{consultant.title}</p>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-foreground mb-1">{projectTitle}</div>
                      <div className="text-muted-foreground">
                        {estimatedHours} hours × ${consultant.hourlyRate}/hr
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 1: Email */}
                {step === "details" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="company@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div className="text-sm">
                          <div className="font-medium text-blue-800">Secure Payment</div>
                          <div className="text-blue-700">Your payment information is encrypted and secure. We never store your card details.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment Details */}
                {step === "payment" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="John Doe"
                        value={formData.cardholderName}
                        onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                        maxLength={19}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ''))}
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Lock className="h-3 w-3" />
                      <span>Your payment details are secured with 256-bit SSL encryption</span>
                    </div>
                  </div>
                )}

                {/* Processing State */}
                {step === "processing" && (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Processing your payment...</p>
                  </div>
                )}

                {/* Cost Breakdown */}
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Consultant Fees ({estimatedHours} hrs)</span>
                    <span className="font-medium">${totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Platform Fee (10%)</span>
                    <span className="font-medium">${platformFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                    <span>Total</span>
                    <span>${grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                {step !== "processing" && (
                  <div className="flex gap-3 pt-4">
                    {step === "payment" && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep("details")}
                        className="flex-1"
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={isProcessing}
                    >
                      {step === "details" ? "Continue to Payment" : `Pay $${grandTotal.toLocaleString()}`}
                    </Button>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border bg-muted/30">
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                <span>Encrypted</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                Stripe Protected
              </Badge>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;
