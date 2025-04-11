import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Calendar, AlertCircle } from 'lucide-react';

const VccOverview = ({ stats = { active: 0, expiring: 0, total: 0 } }) => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-purple-50 p-2 rounded-lg">
          <div className="flex justify-center mb-1">
            <CreditCard className="h-4 w-4 text-purple-500" />
          </div>
          <p className="text-lg font-bold text-purple-900">{stats.active}</p>
          <p className="text-xs text-purple-600">Active</p>
        </div>
        <div className="bg-amber-50 p-2 rounded-lg">
          <div className="flex justify-center mb-1">
            <Calendar className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-lg font-bold text-amber-600">{stats.expiring}</p>
          <p className="text-xs text-amber-600">Expiring Soon</p>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg">
          <div className="flex justify-center mb-1">
            <AlertCircle className="h-4 w-4 text-gray-500" />
          </div>
          <p className="text-lg font-bold text-gray-700">{stats.total}</p>
          <p className="text-xs text-gray-600">Total</p>
        </div>
      </div>
      
      {stats.active > 0 && (
        <Card className="border border-purple-100">
          <CardContent className="p-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-purple-900">Latest VCC</p>
                <p className="text-xs text-purple-600">**** **** **** 4872</p>
              </div>
              <div className="flex items-center">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VccOverview;