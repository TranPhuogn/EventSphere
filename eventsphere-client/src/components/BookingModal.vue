<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px">
        <div>
          <div class="modal-title">{{ step < 4 ? 'Book Tickets' : 'Booking Confirmed!' }}</div>
          <div class="modal-sub" style="margin-bottom: 0">{{ event.title }}</div>
        </div>
        <button class="btn btn-ghost" style="padding: 8px" @click="$emit('close')">✕</button>
      </div>

      <!-- Steps indicator -->
      <div v-if="step < 4" class="booking-steps">
        <div v-for="(s, i) in stepLabels.slice(0, 3)" :key="i" :class="['step', step === i + 1 ? 'active' : step > i + 1 ? 'done' : '']">
          <div class="step-num">{{ step > i + 1 ? '✓' : `0${i + 1}` }}</div>
          <div class="step-label">{{ s }}</div>
        </div>
      </div>

      <!-- Step 1: Select Ticket -->
      <div v-if="step === 1">
        <div v-for="(t, i) in tiers" :key="i" :class="['ticket-type', selectedTier === i ? 'selected' : '']" @click="selectedTier = i">
          <div style="display: flex; justify-content: space-between">
            <div>
              <div class="ticket-type-name">{{ t.name }}</div>
              <div class="ticket-type-avail">{{ t.avail }} remaining</div>
            </div>
            <div class="ticket-type-price">{{ formatPrice(t.price) }}</div>
          </div>
        </div>
        <div class="qty-control">
          <span style="font-size: 14px; color: var(--muted)">Quantity:</span>
          <button class="qty-btn" @click="qty = Math.max(1, qty - 1)">−</button>
          <span class="qty-display">{{ qty }}</span>
          <button class="qty-btn" @click="qty = Math.min(8, qty + 1)">+</button>
        </div>
        <div class="total-row">
          <span class="total-label">Total</span>
          <span class="total-amount">{{ formatPrice(total) }}</span>
        </div>
        <button class="btn btn-primary" style="width: 100%; padding: 13px; margin-top: 8px; justify-content: center" @click="step = 2">Continue →</button>
      </div>

      <!-- Step 2: Info -->
      <div v-if="step === 2">
        <div class="form-group">
          <label class="form-label">Full Name *</label>
          <input class="form-input" placeholder="Nguyễn Văn A" v-model="form.name" />
        </div>
        <div class="form-group">
          <label class="form-label">Email Address *</label>
          <input class="form-input" type="email" placeholder="email@example.com" v-model="form.email" />
        </div>
        <div class="form-group">
          <label class="form-label">Phone Number *</label>
          <input class="form-input" placeholder="0901 234 567" v-model="form.phone" />
        </div>
        <div style="display: flex; gap: 12px; margin-top: 8px">
          <button class="btn btn-outline" style="flex: 1; justify-content: center" @click="step = 1">← Back</button>
          <button class="btn btn-primary" style="flex: 2; justify-content: center" @click="goToStep3" :disabled="!form.name || !form.email || !form.phone">Continue →</button>
        </div>
      </div>

      <!-- Step 3: Payment -->
      <div v-if="step === 3">
        <div class="booking-summary" style="margin-bottom: 20px">
          <div class="summary-row"><span class="summary-label">Event</span><span class="summary-value" style="max-width: 200px; text-align: right; font-size: 13px">{{ event.title }}</span></div>
          <div class="summary-row"><span class="summary-label">Ticket</span><span class="summary-value">{{ currentTier.name }} × {{ qty }}</span></div>
          <div class="summary-row"><span class="summary-label">Total</span><span class="summary-value" style="color: var(--emerald); font-size: 16px; font-weight: 700">{{ formatPrice(total) }}</span></div>
        </div>
        <div style="margin-bottom: 8px; font-size: 13px; color: var(--muted); font-weight: 500">Payment Method</div>
        <div class="payment-options">
          <div v-for="m in paymentMethods" :key="m.id" :class="['payment-opt', payment === m.id ? 'selected' : '']" @click="payment = m.id">
            <div class="payment-icon">{{ m.icon }}</div>
            {{ m.label }}
          </div>
        </div>
        <div style="display: flex; gap: 12px">
          <button class="btn btn-outline" style="flex: 1; justify-content: center" @click="step = 2">← Back</button>
          <button class="btn btn-primary" style="flex: 2; justify-content: center" @click="handlePay" :disabled="loading">
            {{ loading ? 'Processing...' : `Pay ${formatPrice(total)}` }}
          </button>
        </div>
      </div>

      <!-- Step 4: Confirm -->
      <div v-if="step === 4" style="text-align: center">
        <div class="success-icon">🎉</div>
        <div class="success-title">Booking Successful!</div>
        <div class="success-sub">Your e-tickets have been sent to {{ form.email }}</div>
        <div class="booking-summary" style="text-align: left; margin-bottom: 20px">
          <div class="summary-row"><span class="summary-label">Booking Code</span><span class="summary-value" style="font-family: JetBrains Mono, monospace; color: var(--emerald)">{{ bookingCode }}</span></div>
          <div class="summary-row"><span class="summary-label">Event</span><span class="summary-value" style="font-size: 13px">{{ event.title }}</span></div>
          <div class="summary-row"><span class="summary-label">Tickets</span><span class="summary-value">{{ currentTier.name }} × {{ qty }}</span></div>
          <div class="summary-row"><span class="summary-label">Total Paid</span><span class="summary-value" style="color: var(--emerald)">{{ formatPrice(total) }}</span></div>
        </div>
        <button class="btn btn-primary" style="width: 100%; justify-content: center" @click="handleSuccess">View My Tickets</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({ event: { type: Object, required: true } })
const emit = defineEmits(['close', 'success'])

const step = ref(1)
const selectedTier = ref(0)
const qty = ref(1)
const form = ref({ name: '', email: '', phone: '' })
const payment = ref('momo')
const loading = ref(false)
const bookingCode = ref('')

const tiers = [
  { name: 'Standard', price: 500000, avail: 45 },
  { name: 'VIP', price: 1200000, avail: 20 },
  { name: 'SVIP', price: 2500000, avail: 5 },
]

const stepLabels = ['Select Ticket', 'Your Info', 'Payment', 'Confirmed']
const paymentMethods = [
  { id: 'momo', icon: '📱', label: 'MoMo' },
  { id: 'vnpay', icon: '🏦', label: 'VNPay' },
  { id: 'zalopay', icon: '💙', label: 'ZaloPay' },
  { id: 'card', icon: '💳', label: 'Credit Card' },
]

const currentTier = computed(() => tiers[selectedTier.value])
const total = computed(() => currentTier.value.price * qty.value)
const formatPrice = (p) => p.toLocaleString('vi-VN') + 'đ'

const goToStep3 = () => {
  if (form.value.name && form.value.email && form.value.phone) step.value = 3
}

const handlePay = () => {
  if (!form.value.name || !form.value.email || !form.value.phone) return
  loading.value = true
  setTimeout(() => {
    bookingCode.value = 'ES-' + Math.random().toString(36).substr(2, 8).toUpperCase()
    step.value = 4
    loading.value = false
  }, 1600)
}

const handleSuccess = () => {
  emit('success', {
    ...props.event,
    bookingCode: bookingCode.value,
    qty: qty.value,
    tierName: currentTier.value.name,
    total: total.value,
    buyerName: form.value.name,
  })
  emit('close')
}
</script>
